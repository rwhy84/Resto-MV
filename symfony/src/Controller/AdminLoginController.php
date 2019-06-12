<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminLoginController extends AbstractController
{
    /**
     * @Route("/admin/login", name="admin_login")
     */
    public function index()
    {
        return $this->render('admin_login/index.html.twig', [
            'controller_name' => 'AdminLoginController',
        ]);
    }
}
