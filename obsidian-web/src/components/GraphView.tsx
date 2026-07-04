import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useNoteStore } from '../store/noteStore';

interface Node {
  id: string;
  label: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export const GraphView = () => {
  const { notes, activeNoteId, setActiveNote } = useNoteStore();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || Object.keys(notes).length === 0) return;

    // 清空之前的图谱
    d3.select(svgRef.current).selectAll('*').remove();

    // 准备节点和边数据
    const nodes: Node[] = Object.values(notes).map((note) => ({
      id: note.id,
      label: note.title,
    }));

    const edges: Array<{ source: string; target: string }> = [];
    Object.values(notes).forEach((note) => {
      // 提取 [[笔记名]] 格式的链接
      const linkRegex = /\[\[([^\]]+)\]\]/g;
      const matches = [...note.content.matchAll(linkRegex)];
      
      matches.forEach((match) => {
        const targetTitle = match[1];
        const targetNote = Object.values(notes).find((n) => n.title === targetTitle);
        if (targetNote) {
          edges.push({
            source: note.id,
            target: targetNote.id,
          });
        }
      });
    });

    // 创建力导向图
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .call(
        d3.zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
          g.attr('transform', event.transform);
        })
      );

    const g = svg.append('g');

    // 创建箭头标记
    svg.append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    // 创建力模拟
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, { source: string; target: string }>(edges).id((d) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide(40));

    // 绘制边
    const links = g.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#arrowhead)');

    // 绘制节点
    const nodeGroups = g.append('g')
      .selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .call(drag(simulation) as any);

    nodeGroups.append('circle')
      .attr('r', 20)
      .attr('fill', (d) => d.id === activeNoteId ? '#7b68ee' : '#69b3a2')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    nodeGroups.append('text')
      .attr('dy', 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .text((d) => d.label.length > 15 ? d.label.substring(0, 15) + '...' : d.label);

    // 节点点击事件
    nodeGroups.on('click', (_event, d) => {
      setActiveNote(d.id);
    });

    // 更新位置
    simulation.on('tick', () => {
      links
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeGroups.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // 拖拽行为
    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    // 清理
    return () => {
      simulation.stop();
    };
  }, [notes, activeNoteId, setActiveNote]);

  return (
    <div className="graph-view-container">
      <h3>Knowledge Graph</h3>
      <svg ref={svgRef} className="graph-svg" />
      <div className="graph-info">
        <p>Nodes: {Object.keys(notes).length}</p>
        <p>Click nodes to navigate</p>
      </div>
    </div>
  );
};
