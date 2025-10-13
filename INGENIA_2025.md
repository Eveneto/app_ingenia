# 📱 INGENIA 2025 - App de Programação

Aplicativo React Native para visualização da programação do evento INGENIA 2025 - Semana Universitária da Escola Politécnica.

## 🎯 Funcionalidades Principais

### ✅ **Já Implementado:**
- **Duas visualizações**: Tabela e Lista
- **Toggle entre modos**: Interface intuitiva para alternar visualizações
- **Tema claro/escuro**: Adaptação automática ao sistema
- **Cards de eventos**: Design moderno com informações organizadas
- **Tipos de eventos**: Categorização visual (Palestra, Workshop, Feira, etc.)

### 🚧 **Estrutura Base Criada:**
- Tipagem TypeScript completa
- Componentes modulares e reutilizáveis
- Layouts responsivos para mobile

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Header.tsx           # Cabeçalho principal
│   ├── ViewModeToggle.tsx   # Toggle Tabela/Lista
│   ├── TableView.tsx        # Visualização em tabela
│   └── ListView.tsx         # Visualização em lista
├── screens/
│   └── HomeScreen.tsx       # Tela principal
└── types/
    └── Event.ts            # Tipos TypeScript
```

## 🎨 Design System

### **Cores por Tipo de Evento:**
- 🔴 **Abertura**: `#FF6B6B`
- 🔵 **Palestra**: `#4ECDC4`  
- 🟡 **Workshop**: `#45B7D1`
- 🟢 **Feira**: `#96CEB4`
- 🟠 **Outros**: `#FECA57`

### **Layouts:**
- **Lista**: Cards verticais com informações detalhadas
- **Tabela**: Grade horizontal com horários e eventos

## 📋 Dados de Exemplo

O app já contém dados mockup baseados na programação real:
- ✅ Abertura POLI
- ✅ Feira de Mulheres Empreendedoras  
- ✅ Mulheres Inspiram - Instagram
- ✅ INOVA PÓS - DEEPTECH (Oratória e Palestra IA)

## 🚀 Próximos Passos

1. **Integração de dados reais** - Substituir mockup pelos dados reais
2. **Detalhes do evento** - Tela com informações completas
3. **Filtros** - Por tipo de evento, horário, etc.
4. **Favoritos** - Marcar eventos de interesse
5. **Notificações** - Lembrete de eventos
6. **Mapa/Localização** - Localização dos eventos no campus

## 🎯 Melhorias UX Implementadas

- **Mobile-first**: Design otimizado para smartphones
- **Touch-friendly**: Botões e cards com tamanho adequado
- **Scrolling**: Navegação fluida em ambas visualizações
- **Visual feedback**: Estados ativos e hover
- **Consistência**: Design system unificado

## 📱 Como Usar

1. **Toggle de visualização**: Alterne entre "Tabela" e "Lista" no topo
2. **Navegação**: Scroll vertical para ver todos os eventos
3. **Detalhes**: Toque nos cards para mais informações (futuro)

---

**Status:** ✅ Estrutura base completa - Pronto para dados reais!
