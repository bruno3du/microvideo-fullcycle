import { writeFileSync } from 'fs';
import { join } from 'path';

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Error: Migration name is required');
  console.log('Usage: npm run migration:create <migration-name>');
  process.exit(1);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:]/g, '')
  .replace('T', '')
  .split('.')[0];

const fileName = `${timestamp}_${migrationName}.ts`;
const migrationsDir = join(
  __dirname,
  '..',
  'src',
  'core',
  'shared',
  'infra',
  'db',
  'sequelize',
  'migrations',
);
const filePath = join(migrationsDir, fileName);

const template = `import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('table_name', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    // Add your columns here
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
  await sequelize.getQueryInterface().dropTable('table_name');
};
`;

try {
  writeFileSync(filePath, template, 'utf-8');
  console.log(`✅ Migration created successfully!`);
  console.log(`📄 File: ${filePath}`);
  console.log(`🔧 Edit the migration to add your schema changes`);
} catch (error) {
  console.error('❌ Error creating migration:', error);
  process.exit(1);
}
