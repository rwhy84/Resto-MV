<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Newsletter;
use App\Form\NewsletterType;
use App\Repository\CaveVinRepository;

class CaveController extends AbstractController
{
    /**
     * @Route("/cave", name="cave")
     */
    public function index(Request $request, CaveVinRepository $caveVinRepository): Response
    {
        $newsletter = new Newsletter();
        $form = $this->createForm(NewsletterType::class, $newsletter);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newsletter);
            $entityManager->flush();

            return $this->redirectToRoute('cave_index');
        }


        return $this->render('cave/index.html.twig', [
            'controller_name' => 'CaveController',
            'contact' => $newsletter,
            'form' => $form->createView(),
            'bouteilles' => $caveVinRepository->findBy([], ["id" => "DESC"]),
        ]);
    }
}
