<?php

namespace App\Repository;

use App\Entity\CaveVin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CaveVin|null find($id, $lockMode = null, $lockVersion = null)
 * @method CaveVin|null findOneBy(array $criteria, array $orderBy = null)
 * @method CaveVin[]    findAll()
 * @method CaveVin[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CaveVinRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CaveVin::class);
    }

    // /**
    //  * @return CaveVin[] Returns an array of CaveVin objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CaveVin
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
