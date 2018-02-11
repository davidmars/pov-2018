<?php

namespace Pov\Html;

/**
 * La Class Meta contient les métas d'une page html
 *
 * @package Pov\Html
 */
class Meta {
    /**
     * @var string Titre de la page html
     */
    public $title;
    /**
     * @var string Description de la page HTML
     */
    public $description;
    /**
     * @var string Mots clés de la page HTML
     */
    public $keywords;
    /**
     * @var string Auteur de la page
     */
    public $author;
    /**
     * @var string code iso de la langue
     */
    public $langCode;
    /**
     * @var string url du fichier favicon
     */
    public $favicon;
    /**
     * @var string couleur hexa appliquée à la bar de navication sur android et windows phone
     */
    public $themeColor;

}