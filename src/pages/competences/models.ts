export enum WindowCorner {
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight
}

export type LinePosition = {
    angle: number,
    distance: number,
    left: number,
    top: number
}

export type SkillPosition = {
    left: number;
    top: number;
}

export interface Skill {
    /** Positionnement en Y initial, exprimé en % */
    top: number;
    /** Positionnement en X initial, exprimé en % */
    left: number;
    /** Chemin vers le logo de la techno */
    logoUrl: string;
    title: string;
    description: string;
    /** Taille de la techno en mode réduit, exprimé en px, par défaut à 100 */
    size?: number;
}