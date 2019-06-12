<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminGalerieController extends AbstractController
{
    /**
     * @Route("/admin/galerie", name="admin_galerie")
     */
    public function index()
    {
        return $this->render('admin_galerie/index.html.twig', [
            'controller_name' => 'AdminGalerieController',
        ]);
    }
}
