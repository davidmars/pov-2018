<?php


namespace Pov\System;

/**
 * Class Event
 *
 * @package Pov\System
 */
class Event extends AbstractSingleton {

    /**
     * @var array
     */
    private $events=[];

    /**
     * Call the previously registered functions to call associated with $eventName.
     * @param String $eventName Probably a constant EVENT_SOMETHING...
     * @param array|object $args
     * @return array Each listener returns its own result in this array.
     */
    public function dispatch($eventName,array $args=[]){
        $returns=[];
        if(isset($this->events[$eventName]))
        {
            foreach($this->events[$eventName] as $func){
                $returns[]=call_user_func_array($func, $args);
            }
        }
        return $returns;
    }

    /**
     * Register a function to call when the $eventName occurs
     * @param String $eventName Probably a constant EVENT_SOMETHING...
     * @param callable $cb
     */
    public function listen($eventName,\Closure $cb){
        $this->events[$eventName][] = $cb;
    }
}