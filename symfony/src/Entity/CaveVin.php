<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CaveVinRepository")
 */
class CaveVin
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    // BRICOLAGE: ON CREE UNE PROPRIETE POUR GERER L'UPLOAD DE FICHIER
    /**
     * @Assert\Image()
     */
    private $imageUpload;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titre;

    /**
     * @ORM\Column(type="integer")
     */
    private $prix;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    public function __construct()
    {
        dump($this);
        $this->imageUpload       = null;
        $this->image              = "";
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }
    public function getImageUpload()
    {
        return $this->imageUpload;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }
    // OBLIGATOIRE POUR LE TRAITEMENT DU FORMULAIRE
    public function setImageUpload($imageUpload): self
    {
        $this->imageUpload = $imageUpload;
        return $this;
    }


    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
