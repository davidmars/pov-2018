<?php

namespace Pov\Html\Trace;
/**
 * Trait HasAttributesTrait
 * @package Pov\Html\Trace
 */
trait HasAttributesTrait
{

    /**
     * Set the attributes container
     * 
     * @var Attributes
     */
    protected $attributes;

    public function setAttributes(Attributes $attributes)
    {
        $this->attributes = $attributes;
        return $this;
    }

    /**
     * Get the attributes container
     * 
     * @return Attributes
     */
    public function getAttributes()
    {
        return $this->attributes;
    }

    /**
     * Add a class
     * @param string $classname
     * @return HtmlTag
     */
    public function addClass($classname)
    {
        $this->getAttributes()->addClass($classname);
        return $this;
    }

    /**
     * Remove a class
     * @param string $classname
     * @return HtmlTag
     */
    public function removeClass($classname)
    {
        $this->getAttributes()->removeClass($classname);
        return $this;
    }

    /**
     * Determine if the element has a certain class
     * @param string $classname
     * @return bool
     */
    public function hasClass($classname)
    {
        return $this->getAttributes()->hasClass($classname);
    }

    /**
     * Set attribute
     * @param string $name
     * @param mixed $value
     * @return HtmlTag
     */
    public function setAttribute($name, $value)
    {
        $this->getAttributes()[$name] = $value;
        return $this;
    }

    /**
     * Remove attribute
     * @param string $name
     */
    public function removeAttribute($name)
    {

        if (array_key_exists($name, $this->getAttributes())) {
            unset($this->getAttributes()[$name]);
        }
    }

    /**
     * Get attribute value
     * @param string $name
     * @return mixed null if the attribute does not exist, otherwise the current value of the attribute
     */
    public function getAttribute($name)
    {
        return array_key_exists($name, $this->getAttributes()) ? $this->getAttributes()[$name] : null;
    }

}
