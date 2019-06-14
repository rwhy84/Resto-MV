<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Newsletter;
use App\Form\NewsletterType;


class CarteController extends AbstractController
{
    /**
     * @Route("/carte", name="carte")
     */
    public function index(Request $request): Response
    {

        $newsletter = new Newsletter();
        $form = $this->createForm(NewsletterType::class, $newsletter);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newsletter);
            $entityManager->flush();

            return $this->redirectToRoute('carte_index');
        }
        return $this->render('carte/index.html.twig', [
            'controller_name' => 'CarteController',
            'contact' => $newsletter,
            'form' => $form->createView(),
        ]);
    }
}
