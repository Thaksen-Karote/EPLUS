/**
 * Icon Mapper
 * Maps icon string identifiers to React Icon components
 */

import {
 Droplets, FlaskConical, Factory, Leaf, Cog, LampCeilingIcon,Component, ClipboardList, PenTool, Building, Flame, Bell, Cpu, Building2, Hotel, Coffee
} from 'lucide-react';

type IconName = string;

const iconMap: Record<IconName, React.ComponentType<any>> = {
  Droplets,
  FlaskConical,
  Factory,
  Leaf,
  Cog,
  LampCeilingIcon,
  Component,
  ClipboardList,
  PenTool,
  Building,
  Flame,
  Bell,
  Cpu,
  Building2,
  Hotel,
  Coffee
};

export function getIconComponent(iconName: string): React.ComponentType<any> | null {
  return iconMap[iconName] || null;
}
