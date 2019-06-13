<?php

namespace App\Controller;

use App\Entity\Resa;
use App\Form\ResaType;
use App\Repository\ResaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/resa")
 */
class ResaController extends AbstractController
{
    /**
     * @Route("/", name="resa_index", methods={"GET"})
     */
    public function index(ResaRepository $resaRepository): Response
    {
        return $this->render('resa/index.html.twig', [
            'resas' => $resaRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="resa_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $resa = new Resa();
        $form = $this->createForm(ResaType::class, $resa);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($resa);
            $entityManager->flush();

            return $this->redirectToRoute('resa_index');
        }

        return $this->render('resa/new.html.twig', [
            'resa' => $resa,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="resa_show", methods={"GET"})
     */
    public function show(Resa $resa): Response
    {
        return $this->render('resa/show.html.twig', [
            'resa' => $resa,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="resa_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Resa $resa): Response
    {
        $form = $this->createForm(ResaType::class, $resa);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('resa_index', [
                'id' => $resa->getId(),
            ]);
        }

        return $this->render('resa/edit.html.twig', [
            'resa' => $resa,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="resa_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Resa $resa): Response
    {
        if ($this->isCsrfTokenValid('delete'.$resa->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($resa);
            $entityManager->flush();
        }

        return $this->redirectToRoute('resa_index');
    }
}
