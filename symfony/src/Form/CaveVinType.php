<?php

namespace App\Form;

use App\Entity\CaveVin;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class CaveVinType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('imageUpload')
            ->add('titre')
            ->add('prix')
            ->add('description')
            ->add( 'couleur',
        ChoiceType::class,
        [
            'choices' => [
                'Rouge' => "rouge",
                'Blanc' => "blanc",
                'Rosé' => "rose",
            ]
        ],

    );}

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => CaveVin::class,
        ]);
    }
}
