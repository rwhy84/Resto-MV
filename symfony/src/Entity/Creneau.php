<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CreneauRepository")
 */
class Creneau
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datecreneau;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $midi;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $soir;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatecreneau(): ?string
    {
        return $this->datecreneau;
    }

    public function setDatecreneau(string $datecreneau): self
    {
        $this->datecreneau = $datecreneau;

        return $this;
    }

    public function getMidi(): ?string
    {
        return $this->midi;
    }

    public function setMidi(string $midi): self
    {
        $this->midi = $midi;

        return $this;
    }

    public function getSoir(): ?string
    {
        return $this->soir;
    }

    public function setSoir(string $soir): self
    {
        $this->soir = $soir;

        return $this;
    }
}
