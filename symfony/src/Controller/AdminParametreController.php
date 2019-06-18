<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\CreneauRepository;
use App\Entity\Creneau;
use Doctrine\Common\Persistence\ObjectManager;

class AdminParametreController extends AbstractController
{
    /**
     * @Route("/admin/parametre", name="admin_parametre")
     */
    public function index(Request $request, CreneauRepository $creneauRepository): Response
    {
        return $this->render('admin_parametre/index.html.twig', [
            'controller_name' => 'AdminParametreController',
            'creneaux' => $creneauRepository->findBy([], ["id" => "ASC"]),
        ]);
    }
    /**
     * @Route("/admin/Creneau/parametres", name="ajaxParametres")
     *
     * @param Creneau $Creneau
     * @param ObjectManager $manager
     * @param CreneauRepository $creneauRepository
     * @return Response
     */
    public function midi(Request $request, CreneauRepository $creneauRepository): Response
    {
        $inputID = $request->get("monInput");

        $monStatut = $request->get("monstatut");

        $creneau = $request->get("creneau");

        $creneauParam = $creneauRepository->findOneByDatecreneau($inputID);

        if ($creneauParam != NULL) {
            if ($creneau == "midi") {
                $creneauParam->setMidi($monStatut);
                $resultat = "midi OK";

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->flush();
            } else {
                $creneauParam->setSoir($monStatut);
                $resultat = "soir OK";

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->flush();
            }
        } else {
            $resultat = "KO";
        }


        return $this->json(['code' => 200, 'message' => $resultat], 200);
    }
}
