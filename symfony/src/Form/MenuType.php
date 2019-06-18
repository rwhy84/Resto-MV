<?php

namespace App\Form;

use App\Entity\Menu;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class MenuType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->add('imageUpload')
            // ->add('image')
            ->add('titre')
            ->add('prix')
            ->add('description')
            ->add(
                'categorie',
                ChoiceType::class,
                [
                    'choices' => [
                        'Entrée' => "entree",
                        'Plat' => "plat",
                        'Dessert' => "dessert",
                    ]
                ],

            )
            ->add(
                'menuspecial',
                ChoiceType::class,
                [
                    'choices' => [
                        'oui' => true,
                        'non' => false,
                    ]
                ],

            );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Menu::class,
        ]);
    }
}
