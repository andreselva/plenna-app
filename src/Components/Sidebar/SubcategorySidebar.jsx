import { useEffect, useState } from 'react';
import styles from './SubcategorySidebar.module.css';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { ActionDropdown } from '../ActionDropdown/ActionDropdown';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { CategoryKind } from '../../enum/category-kind.enum';
import Loader from '../Loader/Loader';

const RECEITA_COLOR = '#28a745';
const DESPESA_COLOR = '#dc3545';

const SUCCESS_FLASH_MS = 500; 
const FADE_MS = 300;           

export default function SubcategorySidebar({
  isOpen,
  onClose,
  parentCategory,             
  onUpdateSubcategory,        
  onDeleteSubcategory,        
}) {
  const [editingId, setEditingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null); 
  const [draft, setDraft] = useState({ name: '', color: '#000000', description: '' });

  const [localSubs, setLocalSubs] = useState(parentCategory?.subcategories || []);

  const [highlighted, setHighlighted] = useState(new Set());

  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);

  const askDelete = (subId) => {
    setConfirmingDeleteId(subId);
  };

  const cancelDelete = () => {
    setConfirmingDeleteId(null);
  };

  const confirmDelete = async (subId) => {
    setConfirmingDeleteId(null);
    await handleDelete(subId);
  };

  useEffect(() => {
    if (!isOpen || !parentCategory) return;
    setLocalSubs(parentCategory.subcategories || []);
    setEditingId(null);
    setDraft({ name: '', color: '#000000', description: '' });
    setHighlighted(new Set());
    setLoadingId(null);
  }, [isOpen, parentCategory?.id]);

  if (!isOpen || !parentCategory) return null;

  const isReceita = (parentCategory.type || '').toUpperCase() === 'RECEITA';
  const typeBaseColor = isReceita ? RECEITA_COLOR : DESPESA_COLOR;

  const startEdit = (sub) => {
    setEditingId(sub.id);
    setDraft({
      name: sub.name,
      color: sub.color || '#000000',
      description: sub.description || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ name: '', color: '#000000', description: '' });
  };

  const flashRow = (id, { removeAfter = false } = {}) => {
    setHighlighted(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    setTimeout(() => {
      setHighlighted(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });

      if (removeAfter) {
        setTimeout(() => {
          setLocalSubs(prev => prev.filter(sc => sc.id !== id));
        }, FADE_MS);
      }
    }, SUCCESS_FLASH_MS);
  };

  const saveEdit = async () => {
    if (!draft.name?.trim()) return;
    setLoadingId(editingId);
    try {
      const payload = {
        id: editingId,
        name: draft.name,
        color: draft.color,
        description: draft.description,
        type: parentCategory.type,     
        kind: CategoryKind.SUBCATEGORY,
        parentId: parentCategory.id,
      };

      const ok = await onUpdateSubcategory(editingId, payload);
      if (ok) {
        setLocalSubs(prev => prev.map(sc => (sc.id === editingId ? { ...sc, ...payload } : sc)));
        flashRow(editingId);
        cancelEdit();
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (subId) => {
    setLoadingId(subId);
    try {
      const ok = await onDeleteSubcategory(subId);
      if (ok) {
        flashRow(subId, { removeAfter: true });
        if (editingId === subId) cancelEdit();
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.overlay}>
      <aside className={styles.sidebar}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.parentName}>{parentCategory.name}</span>
            <span
              className={globalStyles.statusBadge}
              style={{
                backgroundColor: `${typeBaseColor}33`,
                color: darkenHexColor(typeBaseColor, 25),
                padding: '0 10px'
              }}
            >
              {parentCategory.type}
            </span>
          </div>
          <button className={globalStyles['icon-button']} onClick={onClose} title="Fechar">
            ✕
          </button>
        </div>

        {/* Cabeçalho da lista */}
        <div className={styles.listHeader}>
          <div style={{ flex: '0 0 55%' }}>Nome</div>
          <div style={{ flex: '0 0 20%' }}>Cor</div>
          <div style={{ flex: '0 0 25%', textAlign: 'center' }}>Ações</div>
        </div>

        <div>
          {localSubs.map((sub) => {
            const isEditing = editingId === sub.id;
            const isLoadingRow = loadingId === sub.id;
            const rowClass = `${styles.row} ${highlighted.has(sub.id) ? styles.rowHighlight : ''}`;

            return (
              <div key={sub.id} className={rowClass}>
                {/* Nome */}
                <div style={{ flex: '0 0 55%' }}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={draft.name}
                      onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                      className={globalStyles['input']}
                      placeholder="Nome da subcategoria"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <span
                      className={globalStyles.statusBadge}
                      style={{
                        backgroundColor: `${(sub.color || '#000000')}33`,
                        color: darkenHexColor(sub.color || '#000000', 30),
                        padding: '0 10px'
                      }}
                    >
                      {sub.name}
                    </span>
                  )}
                </div>

                {/* Cor */}
                <div style={{ flex: '0 0 20%', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {isEditing ? (
                    <input
                      type="color"
                      value={draft.color}
                      onChange={(e) => setDraft((d) => ({ ...d, color: e.target.value }))}
                    />
                  ) : (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        backgroundColor: sub.color || '#000000',
                        border: '1px solid #00000022'
                      }}
                    />
                  )}
                </div>

                {/* Ações */}
                <div style={{ flex: '0 0 25%', display: 'flex', justifyContent: 'center' }}>
                  {isLoadingRow ? (
                    <Loader inline size={20} />
                  ) : isEditing ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className={globalStyles['icon-button']} title="Salvar" onClick={saveEdit}>
                        <Save size={16} />
                      </button>
                      <button
                        className={`${globalStyles['icon-button']} ${globalStyles['danger']}`}
                        title="Cancelar"
                        onClick={cancelEdit}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : confirmingDeleteId === sub.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, opacity: 0.8 }}>Confirmar exclusão?</span>
                      <button
                        className={`${globalStyles['icon-button']} ${globalStyles['danger']}`}
                        title="Cancelar"
                        onClick={cancelDelete}
                      >
                        <X size={16} />
                      </button>
                      <button
                        className={`${globalStyles['icon-button']}`}
                        title="Confirmar"
                        onClick={() => confirmDelete(sub.id)}
                      >
                        <Save size={16} />
                      </button>
                    </div>
                  ) : (
                    <ActionDropdown
                      actions={[
                        { icon: <Pencil size={14} />, text: 'Editar', handler: () => startEdit(sub) },
                        { icon: <Trash2 size={14} />, text: 'Excluir', handler: () => askDelete(sub.id) }
                      ]}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
