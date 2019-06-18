<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190618174045 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE contact_client CHANGE tel tel VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE creneau CHANGE datecreneau datecreneau VARCHAR(255) NOT NULL, CHANGE midi midi VARCHAR(255) NOT NULL, CHANGE soir soir VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE resa CHANGE tel tel VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE contact_client CHANGE tel tel INT NOT NULL');
        $this->addSql('ALTER TABLE creneau CHANGE datecreneau datecreneau VARCHAR(19) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE midi midi VARCHAR(160) DEFAULT \'open\' NOT NULL COLLATE utf8mb4_general_ci, CHANGE soir soir VARCHAR(160) DEFAULT \'open\' NOT NULL COLLATE utf8mb4_general_ci');
        $this->addSql('ALTER TABLE resa CHANGE tel tel INT NOT NULL');
    }
}
