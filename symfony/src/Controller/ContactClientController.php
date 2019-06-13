<?php

namespace App\Controller;

use App\Entity\ContactClient;
use App\Form\ContactClientType;
use App\Repository\ContactClientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/contact/client")
 */
class ContactClientController extends AbstractController
{
    /**
     * @Route("/", name="contact_client_index", methods={"GET"})
     */
    public function index(ContactClientRepository $contactClientRepository): Response
    {
        return $this->render('contact_client/index.html.twig', [
            'contact_clients' => $contactClientRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="contact_client_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $contactClient = new ContactClient();
        $form = $this->createForm(ContactClientType::class, $contactClient);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($contactClient);
            $entityManager->flush();

            return $this->redirectToRoute('contact_client_index');
        }

        return $this->render('contact_client/new.html.twig', [
            'contact_client' => $contactClient,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="contact_client_show", methods={"GET"})
     */
    public function show(ContactClient $contactClient): Response
    {
        return $this->render('contact_client/show.html.twig', [
            'contact_client' => $contactClient,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="contact_client_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, ContactClient $contactClient): Response
    {
        $form = $this->createForm(ContactClientType::class, $contactClient);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('contact_client_index', [
                'id' => $contactClient->getId(),
            ]);
        }

        return $this->render('contact_client/edit.html.twig', [
            'contact_client' => $contactClient,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="contact_client_delete", methods={"DELETE"})
     */
    public function delete(Request $request, ContactClient $contactClient): Response
    {
        if ($this->isCsrfTokenValid('delete' . $contactClient->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($contactClient);
            $entityManager->flush();
        }

        return $this->redirectToRoute('contact_client_index');
    }
}
