import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {
  diaAtivoId,
  fetchProgramacao,
  loadCachedProgramacao,
  PERIODOS,
  periodoDoDia,
  temDetalhes,
  textoHorario,
} from '../services/programacao';
import { categoryTagColors, colors, FILTER_CATEGORIES } from '../theme/colors';
import { Atividade, ProgramacaoCompleta } from '../types/programacao';

const ProgramacaoScreen: React.FC = () => {
  const [data, setData] = useState<ProgramacaoCompleta | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diaId, setDiaId] = useState<string>('');
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [detalhe, setDetalhe] = useState<Atividade | null>(null);
  const diaEscolhido = useRef(false);

  const aplicar = useCallback(
    (programacao: ProgramacaoCompleta, preservarDia: boolean) => {
      setData(programacao);
      setDiaId(atual => {
        if (
          preservarDia &&
          atual &&
          programacao.dias.some(dia => dia.id === atual)
        ) {
          return atual;
        }
        return diaAtivoId(programacao.dias);
      });
    },
    [],
  );

  const carregar = useCallback(
    async (modo: 'inicial' | 'refresh') => {
      if (modo === 'refresh') {
        setRefreshing(true);
      }
      try {
        const fresh = await fetchProgramacao();
        aplicar(fresh, modo === 'refresh' || diaEscolhido.current);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Falha ao carregar programação';
        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [aplicar],
  );

  useEffect(() => {
    let ativo = true;
    (async () => {
      const cached = await loadCachedProgramacao();
      if (ativo && cached) {
        aplicar(cached, false);
        setLoading(false);
      }
      if (ativo) {
        await carregar('inicial');
      }
    })();
    return () => {
      ativo = false;
    };
  }, [aplicar, carregar]);

  const diaSelecionado = data?.dias.find(dia => dia.id === diaId);

  const atividades = useMemo(() => {
    if (!data || !diaId) {
      return [];
    }
    const lista = data.atividades[diaId] ?? [];
    const termo = busca.trim().toLowerCase();
    return lista.filter(item => {
      if (filtro !== 'todos' && item.categoria !== filtro) {
        return false;
      }
      if (!termo) {
        return true;
      }
      const texto = `${item.titulo} ${item.palestrante} ${item.local}`.toLowerCase();
      return texto.includes(termo);
    });
  }, [busca, data, diaId, filtro]);

  const grupos = useMemo(
    () =>
      PERIODOS.map(periodo => ({
        ...periodo,
        itens: atividades.filter(item => periodoDoDia(item.inicio) === periodo.id),
      })).filter(grupo => grupo.itens.length > 0),
    [atividades],
  );

  const rotuloCategoria = (chave: string) =>
    data?.categorias[chave] || chave;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.toolbar}>
        <Text style={styles.eyebrow}>Programação 2026</Text>
        <Text style={styles.title}>Agenda</Text>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color={colors.primary} />
          <TextInput
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar atividade, palestrante ou local"
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            autoCorrect={false}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          <FilterPill
            label="Todos"
            active={filtro === 'todos'}
            onPress={() => setFiltro('todos')}
          />
          {FILTER_CATEGORIES.map(chave => (
            <FilterPill
              key={chave}
              label={rotuloCategoria(chave)}
              active={filtro === chave}
              onPress={() => setFiltro(chave)}
            />
          ))}
        </ScrollView>
        {data ? (
          <View style={styles.days}>
            {data.dias.map(dia => {
              const ativo = dia.id === diaId;
              return (
                <TouchableOpacity
                  key={dia.id}
                  style={styles.dayTab}
                  onPress={() => {
                    diaEscolhido.current = true;
                    setDiaId(dia.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dayLabel, ativo && styles.dayLabelActive]}>
                    {dia.label}
                  </Text>
                  {ativo ? <View style={styles.dayUnderline} /> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>

      {loading && !data ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : !data ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            {error || 'Não foi possível carregar a programação.'}
          </Text>
          <TouchableOpacity style={styles.retry} onPress={() => carregar('inicial')}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => carregar('refresh')}
              colors={[colors.accent]}
              tintColor={colors.primary}
            />
          }
        >
          <Text style={styles.dayHeading}>
            {diaSelecionado?.completo || 'Programação'}
          </Text>
          {error ? (
            <Text style={styles.offlineHint}>
              Exibindo a última agenda salva. {error}
            </Text>
          ) : null}
          {grupos.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhuma atividade encontrada para essa busca ou filtro.
            </Text>
          ) : (
            grupos.map(grupo => (
              <View key={grupo.id} style={styles.period}>
                <Text style={styles.periodTitle}>{grupo.label}</Text>
                {grupo.itens.map((item, index) => (
                  <ActivityCard
                    key={`${item.inicio}-${item.titulo}-${index}`}
                    item={item}
                    rotulo={rotuloCategoria(item.categoria)}
                    onOpen={() => {
                      if (temDetalhes(item)) {
                        setDetalhe(item);
                      }
                    }}
                  />
                ))}
              </View>
            ))
          )}
        </ScrollView>
      )}

      <Modal
        visible={detalhe !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setDetalhe(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setDetalhe(null)}
            >
              <Icon name="close" size={22} color={colors.primary} />
            </TouchableOpacity>
            {detalhe ? (
              <ScrollView>
                <Text style={styles.modalTitle}>{detalhe.titulo}</Text>
                <DetailLine
                  label="Horário"
                  value={textoHorario(detalhe.inicio, detalhe.fim)}
                />
                <DetailLine label="Local" value={detalhe.local} />
                <DetailLine label="Palestrante" value={detalhe.palestrante} />
                <DetailLine
                  label="Descrição"
                  value={detalhe.detalhes?.descricao}
                />
                <DetailLine
                  label="Capacidade"
                  value={detalhe.detalhes?.capacidade}
                />
                <DetailLine
                  label="Inscrição"
                  value={detalhe.detalhes?.inscricao}
                />
              </ScrollView>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const FilterPill: React.FC<{
  label: string;
  active: boolean;
  onPress: () => void;
}> = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.pill, active && styles.pillActive]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.pillText, active && styles.pillTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const ActivityCard: React.FC<{
  item: Atividade;
  rotulo: string;
  onOpen: () => void;
}> = ({ item, rotulo, onOpen }) => {
  const tag = categoryTagColors[item.categoria] || {
    background: '#EEF1F4',
    text: colors.textMuted,
  };
  const discreto = item.categoria === 'intervalo';
  const mostraFim = Boolean(item.fim && item.fim !== item.inicio);
  const abre = temDetalhes(item);

  return (
    <TouchableOpacity
      style={[styles.card, discreto && styles.cardMuted]}
      onPress={onOpen}
      activeOpacity={abre ? 0.75 : 1}
      disabled={!abre}
    >
      <View style={styles.timeCol}>
        <Text style={styles.timeStart}>{item.inicio}</Text>
        {mostraFim ? <Text style={styles.timeEnd}>às {item.fim}</Text> : null}
      </View>
      <View style={styles.cardBody}>
        <View style={[styles.tag, { backgroundColor: tag.background }]}>
          <Text style={[styles.tagText, { color: tag.text }]}>
            {rotulo.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        {item.local?.trim() ? (
          <Text style={styles.cardLocal}>Local: {item.local}</Text>
        ) : null}
        {item.palestrante?.trim() ? (
          <Text style={styles.cardSpeaker}>{item.palestrante}</Text>
        ) : null}
      </View>
      {abre ? <Text style={styles.detailsLink}>Detalhes</Text> : null}
    </TouchableOpacity>
  );
};

const DetailLine: React.FC<{ label: string; value?: string }> = ({
  label,
  value,
}) => {
  if (!value?.trim()) {
    return null;
  }
  return (
    <View style={styles.detailLine}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
  },
  toolbar: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    fontFamily: 'serif',
    marginTop: 2,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: 2,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    color: colors.primary,
    fontSize: 15,
  },
  filters: {
    paddingBottom: 12,
    gap: 8,
  },
  pill: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  pillTextActive: {
    color: colors.textOnDark,
  },
  days: {
    flexDirection: 'row',
  },
  dayTab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
  },
  dayLabel: {
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 14,
  },
  dayLabelActive: {
    color: colors.primary,
  },
  dayUnderline: {
    marginTop: 6,
    height: 3,
    width: '70%',
    backgroundColor: colors.accent,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  dayHeading: {
    color: colors.primary,
    fontFamily: 'serif',
    fontSize: 22,
    marginBottom: 12,
  },
  period: {
    marginBottom: 8,
  },
  periodTitle: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 6,
    borderLeftColor: colors.accent,
    padding: 12,
    marginBottom: 10,
  },
  cardMuted: {
    opacity: 0.72,
    borderLeftColor: '#C5CDD6',
  },
  timeCol: {
    width: 72,
    paddingRight: 8,
  },
  timeStart: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  timeEnd: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  cardBody: {
    flex: 1,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  cardTitle: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: '700',
  },
  cardLocal: {
    marginTop: 6,
    color: colors.primary,
    fontSize: 13,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    paddingLeft: 8,
  },
  cardSpeaker: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 13,
  },
  detailsLink: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 8,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  offlineHint: {
    color: colors.accent,
    fontSize: 13,
    marginBottom: 12,
  },
  retry: {
    marginTop: 16,
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  retryText: {
    color: colors.textOnDark,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 33, 78, 0.72)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.background,
    maxHeight: '80%',
    padding: 20,
    borderRadius: 2,
  },
  modalClose: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    color: colors.primary,
    fontFamily: 'serif',
    fontSize: 24,
    marginBottom: 12,
  },
  detailLine: {
    marginBottom: 12,
  },
  detailLabel: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  detailValue: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});

export default ProgramacaoScreen;
