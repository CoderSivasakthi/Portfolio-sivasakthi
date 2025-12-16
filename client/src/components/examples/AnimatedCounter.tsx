import AnimatedCounter from '../AnimatedCounter';

export default function AnimatedCounterExample() {
  return (
    <div className="bg-background p-8 text-center">
      <p className="text-4xl font-bold text-foreground">
        <AnimatedCounter value={12345} />
      </p>
    </div>
  );
}
