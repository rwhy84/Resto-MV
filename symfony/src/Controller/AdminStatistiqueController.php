<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminStatistiqueController extends AbstractController
{
    /**
     * @Route("/admin/statistique", name="admin_statistique")
     */
    public function index()
    {
        return $this->render('admin_statistique/index.html.twig', [
            'controller_name' => 'AdminStatistiqueController',
        ]);
    }
}
