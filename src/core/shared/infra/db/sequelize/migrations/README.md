# Database Migrations

Este diretório contém as migrações do banco de dados usando Umzug + Sequelize.

## Criar uma nova migração

Para criar uma nova migração, execute:

```bash
npm run migration:create nome-da-migracao
```

Exemplo:

```bash
npm run migration:create create-users-table
```

Isso criará um arquivo com timestamp no formato:

```
20231123172814_create-users-table.ts
```

## Editar a migração

Abra o arquivo gerado e edite as funções `up` e `down`:

```typescript
import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('users');
};
```

## Executar migrações

### Desenvolvimento (TypeScript)

```bash
npm run migrate:ts up
```

### Produção (JavaScript compilado)

```bash
npm run migrate:js up
```

## Reverter migrações

```bash
npm run migrate:ts down
```

## Ver status das migrações

```bash
npm run migrate:ts pending
npm run migrate:ts executed
```

## Tipos de operações comuns

### Criar tabela

```typescript
await sequelize.getQueryInterface().createTable('table_name', { ... });
```

### Deletar tabela

```typescript
await sequelize.getQueryInterface().dropTable('table_name');
```

### Adicionar coluna

```typescript
await sequelize.getQueryInterface().addColumn('table_name', 'column_name', {
  type: DataTypes.STRING(255),
  allowNull: true,
});
```

### Remover coluna

```typescript
await sequelize.getQueryInterface().removeColumn('table_name', 'column_name');
```

### Adicionar índice

```typescript
await sequelize.getQueryInterface().addIndex('table_name', ['column_name'], {
  name: 'index_name',
  unique: true,
});
```

### Remover índice

```typescript
await sequelize.getQueryInterface().removeIndex('table_name', 'index_name');
```

## Tipos de dados comuns

- `DataTypes.UUID` - UUID
- `DataTypes.STRING(255)` - VARCHAR(255)
- `DataTypes.TEXT` - TEXT
- `DataTypes.INTEGER` - INTEGER
- `DataTypes.BOOLEAN` - BOOLEAN
- `DataTypes.DATE(3)` - DATETIME com milissegundos
- `DataTypes.DECIMAL(10, 2)` - DECIMAL
- `DataTypes.JSON` - JSON

## Boas práticas

1. **Sempre** crie as funções `up` e `down`
2. A função `down` deve reverter exatamente o que a `up` fez
3. Use transações para operações complexas
4. Nunca edite migrações já executadas em produção
5. Teste suas migrações antes de fazer deploy
6. Use nomes descritivos para as migrações
