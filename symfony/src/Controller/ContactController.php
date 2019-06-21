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
    public function index(Request $request, \Swift_Mailer $mailer): Response
    {

        $newsletter = new Newsletter();
        $contact = new ContactClient();

        $form = $this->createForm(NewsletterType::class, $newsletter);
        $form_contact = $this->createForm(ContactClientType::class, $contact);
        $form->handleRequest($request);
        $form_contact->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newsletter);
            $entityManager->flush();

            //return $this->redirectToRoute('contact');
        } elseif ($form_contact->isSubmitted() && $form_contact->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            
            $entityManager->persist($contact);
            $entityManager->flush();

            $bodyMessage = $contact->getNom() . "\n " . $contact->getPrenom() . "\n" . $contact->getTel() . "\n" . $contact->getMessage() . "\n" . "Message envoyé de: " . $contact->getEmail();

            $message = (new \Swift_Message('Contact Restaurant MV'))
                ->setFrom('rbordet84@gmail.com')
                ->setTo('rbordet84@gmail.com')
                ->setBody(

                    $bodyMessage,


                    'text/plain'
                );

            $mailer->send($message);







            //return $this->redirectToRoute('contact');
        }

        return $this->render('contact/index.html.twig', [
            'controller_name' => 'ContactController',
            'contact' => $contact,
            'newsletter' => $newsletter,
            'form' => $form->createView(),
            'form1' => $form_contact->createView(),
        ]);
    }
}
