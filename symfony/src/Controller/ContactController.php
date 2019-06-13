<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Newsletter;
use App\Form\NewsletterType;
use App\Entity\ContactClient;
use App\Form\ContactClientType;

class ContactController extends AbstractController
{
    /**
     * @Route("/contact", name="contact")
     */
    public function index(Request $request): Response
    {

        $newsletter = new Newsletter();
        $contact = new ContactClient();

        $form = $this->createForm(NewsletterType::class, $newsletter);
        $form1 = $this->createForm(ContactClientType::class, $contact);
        $form->handleRequest($request);
        $form1->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newsletter);
            $entityManager->flush();

            return $this->redirectToRoute('contact');
        } elseif ($form1->isSubmitted() && $form1->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($contact);
            $entityManager->flush();

            return $this->redirectToRoute('contact');
        }

        return $this->render('contact/index.html.twig', [
            'controller_name' => 'ContactController',
            'contact' => $newsletter, $contact,
            'form' => $form->createView(),
            'form' => $form1->createView(),
        ]);
    }
}
