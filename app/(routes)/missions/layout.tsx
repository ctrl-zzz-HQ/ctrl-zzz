import MissionLayout from '@components/MissionLayout';

export default function Layout({ children }: LayoutProps) {

  return (
    <MissionLayout>{children}</MissionLayout>
  );
}
