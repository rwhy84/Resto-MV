<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminInventaireController extends AbstractController
{
    /**
     * @Route("/admin/inventaire", name="admin_inventaire")
     */
    public function index()
    {
        return $this->render('admin_inventaire/index.html.twig', [
            'controller_name' => 'AdminInventaireController',
        ]);
    }
}
