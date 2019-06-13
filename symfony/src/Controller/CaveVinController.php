<?php

namespace App\Controller;

use App\Entity\CaveVin;
use App\Form\CaveVinType;
use App\Repository\CaveVinRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/cave/vin")
 */
class CaveVinController extends AbstractController
{
    /**
     * @Route("/", name="cave_vin_index", methods={"GET"})
     */
    public function index(CaveVinRepository $caveVinRepository): Response
    {
        return $this->render('cave_vin/index.html.twig', [
            'cave_vins' => $caveVinRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="cave_vin_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $caveVin = new CaveVin();
        $form = $this->createForm(CaveVinType::class, $caveVin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($caveVin);
            $entityManager->flush();

            return $this->redirectToRoute('cave_vin_index');
        }

        return $this->render('cave_vin/new.html.twig', [
            'cave_vin' => $caveVin,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="cave_vin_show", methods={"GET"})
     */
    public function show(CaveVin $caveVin): Response
    {
        return $this->render('cave_vin/show.html.twig', [
            'cave_vin' => $caveVin,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="cave_vin_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, CaveVin $caveVin): Response
    {
        $form = $this->createForm(CaveVinType::class, $caveVin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('cave_vin_index', [
                'id' => $caveVin->getId(),
            ]);
        }

        return $this->render('cave_vin/edit.html.twig', [
            'cave_vin' => $caveVin,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="cave_vin_delete", methods={"DELETE"})
     */
    public function delete(Request $request, CaveVin $caveVin): Response
    {
        if ($this->isCsrfTokenValid('delete'.$caveVin->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($caveVin);
            $entityManager->flush();
        }

        return $this->redirectToRoute('cave_vin_index');
    }
}
