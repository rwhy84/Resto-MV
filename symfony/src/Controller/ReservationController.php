<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Newsletter;
use App\Form\NewsletterType;
use App\Repository\CreneauRepository;
use App\Entity\Resa;
use App\Form\ResaType;


class ReservationController extends AbstractController
{
    /**
     * @Route("/reservation", name="reservation")
     */
    public function index(Request $request, CreneauRepository $creneauRepository, \Swift_Mailer $mailer): Response
    {

        $newsletter = new Newsletter();
        $resa = new Resa();
        $form = $this->createForm(NewsletterType::class, $newsletter);
        $formResa = $this->createForm(ResaType::class, $resa);
        $form->handleRequest($request);
        $formResa->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newsletter);
            $entityManager->flush();

            // return $this->redirectToRoute('galerie_index');




        } elseif ($formResa->isSubmitted() && $formResa->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            dump($resa);
            $entityManager->persist($resa);
            $entityManager->flush();

            $bodyMessage = 'Nom de réservation: ' . $resa->getNom() . "\n " . 'Heure de Réservation: ' . $resa->getheure() . "\n" . "Nombres de couverts: " . $resa->getnbclient()  . "\n" . 'Numéro de téléphone: ' . $resa->getTel() . "\n" . "Message envoyé de: " . $resa->getEmail() . "\n" . $resa->getMessage();

            $message = (new \Swift_Message('Réservation de Table'))
                ->setFrom($resa->getEmail())
                ->setTo('rbordet84@gmail.com')
                ->setBody(
                    $bodyMessage,


                    'text/plain'
                );

            $mailer->send($message);







            //return $this->redirectToRoute('contact');
        }

        return $this->render('reservation/index.html.twig', [
            'controller_name' => 'ReservationController',
            'contact' => $newsletter,
            'form' => $form->createView(),
            'formResa' => $formResa->createView(),
            'creneaux' => $creneauRepository->findAll([], ["id" => "ASC"]),
        ]);
    }
}
