<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CreatelineController extends AbstractController
{
    /**
     * @Route("/createline", name="createline")
     */
    public function index()
    {
        return $this->render('createline/index.html.twig', [
            'controller_name' => 'CreatelineController',
        ]);
    }
}
