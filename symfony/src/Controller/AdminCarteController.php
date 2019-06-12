<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminCarteController extends AbstractController
{
    /**
     * @Route("/admin/carte", name="admin_carte")
     */
    public function index()
    {
        return $this->render('admin_carte/index.html.twig', [
            'controller_name' => 'AdminCarteController',
        ]);
    }
}
