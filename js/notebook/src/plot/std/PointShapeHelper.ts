/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

export default class PointShapeHelper {

  public static getDiamondPoints(x: number, y: number, size: number): string {
    let r = size / 2;
    let points: Point2D[] = [];

    points.push({ x: x - r, y: y     });
    points.push({ x: x    , y: y - r });
    points.push({ x: x + r, y: y     });
    points.push({ x: x    , y: y + r });

    return points.reduce(this.pointsReducer, "");
  }

  public static getTrianglePoints(x: number, y: number, size: number): string {
    let r = size / 2;
    let ang30: number = 30 * (Math.PI / 180);
    let sin30: number = Math.sin(ang30);
    let cos30: number = Math.cos(ang30);
    let points: Point2D[] = [];

    points.push({ x: x            , y: y - r         });
    points.push({ x: x + r * cos30, y: y + r * sin30 });
    points.push({ x: x - r * cos30, y: y + r * sin30 });

    return points.reduce(this.pointsReducer, "");
  }

  public static getDownTrianglePoints(x: number, y: number, size: number): string {
    let r = size / 2;
    let ang30: number = 30 * (Math.PI / 180);
    let sin30: number = Math.sin(ang30);
    let cos30: number = Math.cos(ang30);
    let points: Point2D[] = [];

    points.push({ x: x            , y: y + r         });
    points.push({ x: x + r * cos30, y: y - r * sin30 });
    points.push({ x: x - r * cos30, y: y - r * sin30 });

    return points.reduce(this.pointsReducer, "");
  }

  public static getLevelPoints(x: number, y: number, size: number): string {
    let r = size / 2;
    let points: Point2D[] = [];

    points.push({ x: x - r, y: y - 0.5 });
    points.push({ x: x + r, y: y - 0.5 });
    points.push({ x: x + r, y: y + 0.5 });
    points.push({ x: x - r, y: y + 0.5 });

    return points.reduce(this.pointsReducer, "");
  }

  public static getVLevelPoints(x: number, y: number, size: number): string {
    let r = size / 2;
    let points: Point2D[] = [];

    points.push({ x: x - 0.5, y: y - r });
    points.push({ x: x - 0.5, y: y + r });
    points.push({ x: x + 0.5, y: y + r });
    points.push({ x: x + 0.5, y: y - r });

    return points.reduce(this.pointsReducer, "");
  }

  public static getLineCrossPoints(x: number, y: number, size: number): string {
    return PointShapeHelper.getCrossPoints(x, y, size, 1);
  }

  public static getCrossPoints(
    x: number,
    y: number,
    size: number,
    thickness: number = null
  ): string {
    return this.prepareCrossPoints(x,y,size, thickness)
      .reduce(this.pointsReducer, "");
  }

  public static getDCrossPoints(x: number, y: number, size: number): string {
    let ang45: number = 45 * (Math.PI / 180);
    let sin45: number = Math.sin(ang45);
    let cos45: number = Math.cos(ang45);

    function rotate(p: Point2D) {
      return {
        x: x + (p.x - x) * cos45 - (p.y - y) * sin45,
        y: y + (p.x - x) * sin45 + (p.y - y) * cos45
      }
    }

    return this.prepareCrossPoints(x, y, size)
      .map(rotate)
      .reduce(this.pointsReducer, "");
  }

  private static prepareCrossPoints(
    x: number,
    y: number,
    size: number,
    thickness: number = null
  ): Point2D[] {
    let r = size / 2;
    let r2 = (null === thickness) ? r / 2 : thickness / 2;
    let points: Point2D[] = [];

    points.push({ x: x + r2, y: y - r  });
    points.push({ x: x + r2, y: y - r2 });
    points.push({ x: x + r , y: y - r2 });

    points.push({ x: x + r , y: y + r2 });
    points.push({ x: x + r2, y: y + r2 });
    points.push({ x: x + r2, y: y + r  });

    points.push({ x: x - r2, y: y + r  });
    points.push({ x: x - r2, y: y + r2 });
    points.push({ x: x - r , y: y + r2 });

    points.push({ x: x - r , y: y - r2 });
    points.push({ x: x - r2, y: y - r2 });
    points.push({ x: x - r2, y: y - r  });

    return points;
  };

  private static pointsReducer(accumulator: string, current: Point2D): string {
    return accumulator + `${current.x},${current.y} `;
  }
}

interface Point2D {
  x: number;
  y: number;
}
