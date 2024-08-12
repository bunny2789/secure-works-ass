import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit {
  @Input() data: { name: string; value: number }[] = [];

  private svg!: { selectAll: (arg0: string) => { (): any; new(): any; data: { (arg0: { name: string; value: number; }[]): { (): any; new(): any; enter: { (): { (): any; new(): any; append: { (arg0: string): { (): any; new(): any; attr: { (arg0: string, arg1: string): { (): any; new(): any; attr: { (arg0: string, arg1: (d: any) => any): { (): any; new(): any; attr: { (arg0: string, arg1: (d: any) => any): { (): any; new(): any; attr: { (arg0: string, arg1: any): { (): any; new(): any; attr: { (arg0: string, arg1: (d: any) => number): { (): any; new(): any; attr: { (arg0: string, arg1: string): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; };
  private margin = 30;
  private width = 400;
  private height = 300;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.createSvg();
    this.drawBars();
  }

  private createSvg(): void {
    this.svg = d3.select(this.elementRef.nativeElement)
      .select('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', `translate(${this.margin},${this.margin})`);
  }

  private drawBars(): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([this.height, 0]);

    x.domain(this.data.map(d => d.name));
    y.domain([0, d3.max(this.data, (d: { value: any; }) => d.value)]);

    this.svg.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { name: any; }) => x(d.name))
      .attr('y', (d: { value: any; }) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d: { value: any; }) => this.height - y(d.value))
      .attr('fill', 'steelblue');
  }
}
