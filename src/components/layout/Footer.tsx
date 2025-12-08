export default function Footer() {
  return (
    <footer className="bg-[#1e293b] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/docs/readme-assets/max-logo.png" alt="M.A.X." className="h-14 mb-4" />
            <p className="text-[#64748b]">
              Le premier Self-Healing CRM™ au monde
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#00cfff]">Produit</h4>
            <ul className="space-y-2 text-[#64748b]">
              <li className="hover:text-[#00cfff] cursor-pointer transition-colors">Fonctionnalités</li>
              <li className="hover:text-[#00cfff] cursor-pointer transition-colors">Tarifs</li>
              <li className="hover:text-[#00cfff] cursor-pointer transition-colors">Démo</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#00cfff]">Entreprise</h4>
            <ul className="space-y-2 text-[#64748b]">
              <li className="hover:text-[#00cfff] cursor-pointer transition-colors">À propos</li>
              <li className="hover:text-[#00cfff] cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#00cfff]">Légal</h4>
            <ul className="space-y-2 text-[#64748b]">
              <li className="hover:text-[#00cfff] cursor-pointer transition-colors">Mentions légales</li>
              <li className="hover:text-[#00cfff] cursor-pointer transition-colors">Confidentialité</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#64748b] mt-8 pt-8 text-center text-[#64748b]">
          <p>&copy; 2025 M.A.X. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
