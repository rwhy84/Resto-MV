<?php

namespace App\Controller;

use App\Entity\Upload;
use App\Form\UploadType;
use App\Repository\UploadRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/upload")
 */
class UploadController extends AbstractController
{
    /**
     * @Route("/", name="upload_index", methods={"GET"})
     */
    public function index(UploadRepository $uploadRepository): Response
    {
        return $this->render('upload/index.html.twig', [
            'uploads' => $uploadRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="upload_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $upload = new Upload();
        $form = $this->createForm(UploadType::class, $upload);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $fichierUploade = $upload->getImageUpload();

            // COOL POUR LE DEBUG
            dump($fichierUploade);
            if ($fichierUploade != null) {
                // IL FAUT DEPLACER LE FICHIER DE LA QUARANTAINE VERS LE DOSSIER FINAL
                $fileName = $fichierUploade->getClientOriginalName();

                $fileName = strtolower($fileName);
                // ICI IL FAUT FILTRER LE NOM DU FICHIER QU'ON VA CREER
                // https://www.php.net/manual/fr/function.preg-replace.php
                // PATHINFO_FILENAME 
                $nomSansExtension   = pathinfo($fileName, PATHINFO_FILENAME);
                $extension          = pathinfo($fileName, PATHINFO_EXTENSION);

                $nomSansExtension = preg_replace("/[^a-zA-Z0-9-\.]/i", "-", $nomSansExtension);
                $nomSansExtension = trim($nomSansExtension);

                $extension = preg_replace("/[^a-zA-Z0-9-\.]/i", "-", $extension);
                $extension = trim($extension);

                $fileName = "$nomSansExtension.$extension";

                $fichierUploade->move(
                    $this->getParameter('upload_directory') . "/galerie",   // PARAM1: DOSSIER CIBLE 
                    $fileName
                );                                                 // PARAM2: NOM DU FICHIER CIBLE

                // POUR FINIR, IL FAUT STOCKER LE CHEMIN EN BASE DE DONNEES
                $upload->setImage("asset/img/galerie/$fileName");
            }
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($upload);
            $entityManager->flush();
        }




        return $this->render('upload/new.html.twig', [
            'upload' => $upload,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="upload_show", methods={"GET"})
     */
    public function show(Upload $upload): Response
    {
        return $this->render('upload/show.html.twig', [
            'upload' => $upload,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="upload_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Upload $upload): Response
    {
        $form = $this->createForm(UploadType::class, $upload);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('upload_index', [
                'id' => $upload->getId(),
            ]);
        }

        return $this->render('upload/edit.html.twig', [
            'upload' => $upload,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="upload_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Upload $upload): Response
    {
        if ($this->isCsrfTokenValid('delete' . $upload->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($upload);
            $entityManager->flush();
        }

        return $this->redirectToRoute('upload_index');
    }
}
