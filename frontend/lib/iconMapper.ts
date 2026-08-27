/**
 * Icon Mapper
 * Maps icon string identifiers to React Icon components
 */

import {
  Droplets, FlaskConical, Factory, Leaf, Cog, LampCeilingIcon, Component, ClipboardList, PenTool, Building, Flame, Bell, Cpu, Building2, Hotel, Coffee, Wind, Zap, Fan,
  Wrench, Cable, PlugZap, Lightbulb, CloudLightning, PackageSearch, HardHat, ClipboardCheck, Waves, CircleGauge, SprayCan,
  BellRing, BellElectric,
  SlidersHorizontal,
  Store,
  Landmark,
  Construction,
  GlassWater,
  createLucideIcon,
} from 'lucide-react';
import { faucet } from '@lucide/lab';

const Faucet = createLucideIcon('Faucet', faucet);

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
  BellRing,
  Cpu,
  Building2,
  Hotel,
  Coffee,
  Wind,
  Zap,
  Fan,
  Wrench,
  Cable,
  PlugZap,
  Lightbulb,
  CloudLightning,
  PackageSearch,
  HardHat,
  ClipboardCheck,
  Waves,
  CircleGauge,
  SprayCan,
  BellElectric,
  SlidersHorizontal,
  Store,
  Landmark,
  Construction,
  GlassWater,
  Faucet,
};

export function getIconComponent(iconName: string): React.ComponentType<any> | null {
  return iconMap[iconName] || null;
}
