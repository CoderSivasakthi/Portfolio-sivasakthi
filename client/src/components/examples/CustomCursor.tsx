import CustomCursor from '../CustomCursor';

export default function CustomCursorExample() {
  return (
    <div className="bg-background min-h-[200px] flex items-center justify-center">
      <CustomCursor />
      <p className="text-muted-foreground">Move your mouse to see the custom cursor</p>
    </div>
  );
}
