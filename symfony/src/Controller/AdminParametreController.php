<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminParametreController extends AbstractController
{
    /**
     * @Route("/admin/parametre", name="admin_parametre")
     */
    public function index()
    {
        return $this->render('admin_parametre/index.html.twig', [
            'controller_name' => 'AdminParametreController',
        ]);
    }
}
