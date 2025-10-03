export default function ShopFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} X-Store. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4">
          <a href="/privacy" className="transition-colors hover:text-primary">
            Privacy Policy
          </a>
          <a href="/terms" className="transition-colors hover:text-primary">
            Terms of Service
          </a>
          <a href="/support" className="transition-colors hover:text-primary">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
