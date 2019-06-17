<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


// POUR GARANTIR L'UNICITE
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

## POUR ETRE COMPATIBLE AVEC LE FIREWALL SYMFONY
use Symfony\Component\Security\Core\User\UserInterface;


/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity("email")
 * @UniqueEntity("username")
 */
class User
implements UserInterface, \Serializable
// => ON S'ENGAGE A AJOUTER LES METHODES DEMANDEES PAR CES INTERFACES
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=160)
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=160)
     * @Assert\Length(min=3, max=10)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=160)
     * @Assert\Length(min=3,max=160)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=160)
     * @Assert\Length(min=3, max=100)
     */
    private $role;

    // IMPLEMENTER LES METHODES ABSTRAITES DES INTERFACES

    // ON S'EN FOUT MAIS IL FAUT LA METHODE...
    public function getSalt()
    {
        // The bcrypt and argon2i algorithms don't require a separate salt.
        // You *may* need a real salt if you choose a different encoder.
        return null;
    }

    public function getRoles()
    {
        // ON RENVOIE UN TABLEAU 
        return [$this->role];
    }

    // ON S'EN FOUT MAIS IL FAUT LA METHODE...
    public function eraseCredentials()
    {
        // ON S'EN FOUT
    }

    /** @see Serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt,
        ));
    }

    /** @see Serializable::unserialize() */
    public function unserialize($serialized)
    {
        list(
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt
        ) = unserialize($serialized);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }
}
