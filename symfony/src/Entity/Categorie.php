<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CategorieRepository")
 */
class Categorie
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $entree;

    /**
     * @ORM\Column(type="boolean")
     */
    private $plat;

    /**
     * @ORM\Column(type="boolean")
     */
    private $dessert;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEntree(): ?bool
    {
        return $this->entree;
    }

    public function setEntree(bool $entree): self
    {
        $this->entree = $entree;

        return $this;
    }

    public function getPlat(): ?bool
    {
        return $this->plat;
    }

    public function setPlat(bool $plat): self
    {
        $this->plat = $plat;

        return $this;
    }

    public function getDessert(): ?bool
    {
        return $this->dessert;
    }

    public function setDessert(bool $dessert): self
    {
        $this->dessert = $dessert;

        return $this;
    }
}
