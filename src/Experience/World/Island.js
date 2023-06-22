import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'
import {mergeGeometries} from "three/addons/utils/BufferGeometryUtils.js";
import {Vector2} from "three";
import {SimplexNoise} from "three/addons/math/SimplexNoise.js";
import Stone from "./Stone.js";
import Tree from "./Tree.js";
import Light from "./Light.js";
import House from "./House.js";
import Dinner from "./Dinner.js";
import Furnace from "./Furnace.js";
import Flamingo from "./Flamingo.js";

export default class Island
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.envMap = this.experience.resources.envMap
        this.maxHeight = this.experience.maxHeight

        this.stoneHeight = this.maxHeight * 0.8
        this.dirtHeight = this.maxHeight * 0.7
        this.grassHeight = this.maxHeight * 0.5
        this.sandHeight = this.maxHeight * 0.3
        this.dirt2Height = 0

        this.simplex = new SimplexNoise()
        this.stoneGeometries = []
        this.dirtGeometries = []
        this.grassGeometries = []
        this.sandGeometries = []
        this.dirt2Geometries = []

        this.projects = ["house", "dinner", "furnace", "flamingo"]
        this.displayedProjects = []

        for(let i = -50; i < 50; i++) {
            for(let j = -50; j < 50; j++) {
                let position = this.tilePosition(i, j)

                if(position.length() > 51) continue

                let noise = (this.simplex.noise(i * 0.1, j * 0.1) + 1) * 0.5
                noise = Math.pow(noise, 1.5)
                this.makeHexagon(noise * this.maxHeight, position)
            }
        }

        this.setMesh()
    }

    tilePosition(x, y) {
        return new Vector2((x + (y % 2) * 0.5) * 5.3, y * 4.65)
    }

    makeHexagon(height, position) {
        let geo = this.hexGeometry(height, position);
        let added = false
        if(height > this.stoneHeight) {
            this.stoneGeometries.push(geo)
            if(Math.random() > 0.8) {
                this.stoneGeometries.push(new Stone(position, height).setMesh())
                added = true
            }
        } else if(height > this.dirtHeight) {
            this.dirtGeometries.push(geo)
            if(Math.random() > 0.8) {
                new Tree(position, height).setMesh().forEach((geo) => {
                    this.grassGeometries.push(geo)
                })
                added = true
            }
        } else if(height > this.grassHeight) {
            this.grassGeometries.push(geo)
        } else if(height > this.sandHeight) {
            this.sandGeometries.push(geo)
            if(Math.random() > 0.8) {
                this.stoneGeometries.push(new Stone(position, height).setMesh())
                added = true
            }
        } else if(height > this.dirt2Height) {
            this.dirt2Geometries.push(geo)
        }

        if(Math.random() * 200 < 10  && this.projects.length > 0 && height > this.grassHeight && !added) {
            const model = this.projects[Math.floor(Math.random() * this.projects.length)];
            if(model === "house") {
                this.house = new House(position, height)
            } else if(model === "dinner") {
                this.dinner = new Dinner(position, height)
            } else if(model === "furnace") {
                this.furnace = new Furnace(position, height)
            } else if(model === "flamingo") {
                this.flamingo = new Flamingo(position, height)
            }
            this.displayedProjects.push(model)
            const index = this.projects.indexOf(model)
            this.projects.splice(index, 1)
        }
    }

    hexGeometry(height, position) {
        let geo = new THREE.CylinderGeometry(3, 3, height, 6, 1, false);
        geo.translate(position.x, height * 0.5, position.y);
        return geo;
    }

    setMesh()
    {
        if(this.stoneGeometries.length) {
            this.stoneMesh = this.hexMesh(this.stoneGeometries, this.resources.items.stoneTexture)
            this.scene.add(this.stoneMesh)
        }
        if(this.dirtGeometries.length) {
            this.dirtMesh = this.hexMesh(this.dirtGeometries, this.resources.items.dirtTexture)
            this.scene.add(this.dirtMesh)
        }
        if(this.grassGeometries.length) {
            this.grassMesh = this.hexMesh(this.grassGeometries, this.resources.items.grassTexture)
            this.scene.add(this.grassMesh)
        }
        if(this.sandGeometries.length) {
            this.sandMesh = this.hexMesh(this.sandGeometries, this.resources.items.sandTexture)
            this.scene.add(this.sandMesh)
        }
        if(this.dirt2Geometries.length) {
            this.dirt2Mesh = this.hexMesh(this.dirt2Geometries, this.resources.items.dirt2Texture)
            this.scene.add(this.dirt2Mesh)
        }
    }

    hexMesh(geo, map) {
        if(geo.length === 0) return null

        let material = new THREE.MeshStandardMaterial({
            envMap: this.envMap,
            envMapIntensity: 0.135,
            flatShading: true,
            map: map,
        });

        this.mesh = new THREE.Mesh(mergeGeometries(geo), material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.mesh.translateY(-15)

        return this.mesh;
    }

    update() {
        this.stoneMesh.rotation.y += 0.001
        this.dirtMesh.rotation.y += 0.001
        this.grassMesh.rotation.y += 0.001
        this.sandMesh.rotation.y += 0.001
        this.dirt2Mesh.rotation.y += 0.001
    }
}