<?php

namespace App\Form;

use App\Entity\Resa;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ResaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('date')
            ->add('heure', ChoiceType::class, [
                'choices'  => [
                    'Déjeuner' => 'Déjeuner',
                    '12h00' => '12h00',
                    '12h15' => '12h15',
                    '12h30' => '12h30',
                    '12h45' => '12h45',
                    '13h00' => '13h00',
                    '13h15' => '13h15',
                    '13h30' => '13h30',
                    '13h45' => '13h45',
                    '14h00' => '14h00',
                    '14h15' => '14h15',
                    '14h30' => '14h30',
                    'Diner' => 'Diner',
                    '20h00' => '20h00',
                    '20h15' => '20h15',
                    '20h30' => '20h30',
                    '20h45' => '20h45',
                    '21h00' => '21h00',
                    '21h15' => '21h15',
                    '21h30' => '21h30',
                    '21h45' => '21h45',
                    '22h00' => '22h00',
                ],
            ])

            ->add('nbclient', ChoiceType::class, [
                'choices'  => [
                    'Nombre de couvert *' => 'Nombre de couvert *',
                    '1' => '1',
                    '2' => '2',
                    '3' => '3',
                    '4' => '4',
                    '5' => '5',
                    '6' => '6',
                    '7' => '7',
                    '8' => '8',
                    '9' => '9',
                    '10' => '10',
                    '11' => '11',
                    '12' => '12',
                    '13' => '13',
                    '14' => '14',
                    '15' => '15',
                ],
            ])
            ->add('nom')
            ->add('tel')
            ->add('email')
            ->add('message');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Resa::class,
        ]);
    }
}
