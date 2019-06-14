<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Newsletter;
use App\Form\NewsletterType;
use App\Entity\Upload;
use App\Form\UploadType;
use App\Repository\UploadRepository;

class GalerieController extends AbstractController
{
    /**
     * @Route("/galerie", name="galerie")
     */
    public function index(Request $request, UploadRepository $uploadRepository): Response
    {

        $newsletter = new Newsletter();
        $form = $this->createForm(NewsletterType::class, $newsletter);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newsletter);
            $entityManager->flush();

            return $this->redirectToRoute('galerie_index');
        }

        return $this->render('galerie/index.html.twig', [
            'controller_name' => 'GalerieController',
            'contact' => $newsletter,
            'form' => $form->createView(),
            'uploads' => $uploadRepository->findBy([], ["id" => "DESC"]),
        ]);
    }
}
