import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const migrationName = process.argv[3];
const entityName = process.argv[2];

if (!entityName) {
  console.error('❌ Error: Entity name is required');
  console.log('Usage: npm run migration:create <entity-name> <migration-name>');
  process.exit(1);
}

if (!migrationName) {
  console.error('❌ Error: Migration name is required');
  console.log('Usage: npm run migration:create <entity-name> <migration-name>');
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
  entityName,
  'infra',
  'db',
  'sequelize',
  'migrations',
);

function checkEntityExists(entityName: string) {
  if (!existsSync(join(__dirname, '..', 'src', 'core', entityName))) {
    console.error(`❌ Error: Entity ${entityName} does not exist`);
    process.exit(1);
  }
}

checkEntityExists(entityName);

function createDirectoryIfNotExists(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

createDirectoryIfNotExists(migrationsDir);

const filePath = join(migrationsDir, fileName);

const template = `import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('${entityName}', {
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
  await sequelize.getQueryInterface().dropTable('${entityName}');
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
