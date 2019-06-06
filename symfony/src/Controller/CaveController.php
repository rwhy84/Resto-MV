<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CaveController extends AbstractController
{
    /**
     * @Route("/cave", name="cave")
     */
    public function index()
    {
        return $this->render('cave/index.html.twig', [
            'controller_name' => 'CaveController',
        ]);
    }
}
