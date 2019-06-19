<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190619075534 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, entree TINYINT(1) NOT NULL, plat TINYINT(1) NOT NULL, dessert TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contact_client CHANGE tel tel VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE creneau CHANGE datecreneau datecreneau VARCHAR(255) NOT NULL, CHANGE midi midi VARCHAR(255) NOT NULL, CHANGE soir soir VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE menu ADD categorie VARCHAR(255) NOT NULL, ADD menuspecial TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE resa CHANGE tel tel VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE categorie');
        $this->addSql('ALTER TABLE contact_client CHANGE tel tel INT NOT NULL');
        $this->addSql('ALTER TABLE creneau CHANGE datecreneau datecreneau VARCHAR(19) DEFAULT NULL COLLATE utf8mb4_unicode_ci, CHANGE midi midi VARCHAR(160) DEFAULT \'open\' NOT NULL COLLATE utf8mb4_general_ci, CHANGE soir soir VARCHAR(160) DEFAULT \'open\' NOT NULL COLLATE utf8mb4_general_ci');
        $this->addSql('ALTER TABLE menu DROP categorie, DROP menuspecial');
        $this->addSql('ALTER TABLE resa CHANGE tel tel INT NOT NULL');
    }
}
