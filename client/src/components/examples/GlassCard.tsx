import GlassCard from '../GlassCard';

export default function GlassCardExample() {
  return (
    <div className="bg-background p-8">
      <GlassCard className="p-6" hover>
        <h3 className="text-lg font-medium text-foreground">Glass Card Component</h3>
        <p className="text-muted-foreground mt-2">A reusable glassmorphic card.</p>
      </GlassCard>
    </div>
  );
}
