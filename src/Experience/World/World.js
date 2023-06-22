import Experience from '../Experience.js'
import Environment from './Environment.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Island from "./Island.js";
import Planet from "./Planet.js";
import Water from "./Water.js";
import House from "./House.js";

export default class World
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // this.axesHelper = new THREE.AxesHelper( 10 );
        // this.scene.add( this.axesHelper );

        this.experience.resources.on('ready', () =>
        {
            this.planet = new Planet()
            this.island = new Island()
            this.water = new Water()
            this.environment = new Environment()
        })
    }

    update() {
        if(this.planet) {
            this.planet.update()
        }
        if(this.environment) {
            this.environment.update()
        }
    }
}