<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\CreneauRepository;

class AdminParametreController extends AbstractController
{
    /**
     * @Route("/admin/parametre", name="admin_parametre")
     */
    public function index(Request $request, CreneauRepository $creneauRepository): Response
    {
        return $this->render('admin_parametre/index.html.twig', [
            'controller_name' => 'AdminParametreController',
            'creneaux' => $creneauRepository->findBy([], ["id" => "ASC"]),
        ]);
    }
}
