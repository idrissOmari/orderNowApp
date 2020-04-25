package fr.omatech.ordernow.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A FormulaOrder.
 */
@Entity
@Table(name = "formula_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FormulaOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "formula_order_list_product",
               joinColumns = @JoinColumn(name = "formula_order_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_product_id", referencedColumnName = "id"))
    private Set<Product> listProducts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("listFormulaOrders")
    private Order order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public FormulaOrder quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Set<Product> getListProducts() {
        return listProducts;
    }

    public FormulaOrder listProducts(Set<Product> products) {
        this.listProducts = products;
        return this;
    }

    public FormulaOrder addListProduct(Product product) {
        this.listProducts.add(product);
        product.getListFormulas().add(this);
        return this;
    }

    public FormulaOrder removeListProduct(Product product) {
        this.listProducts.remove(product);
        product.getListFormulas().remove(this);
        return this;
    }

    public void setListProducts(Set<Product> products) {
        this.listProducts = products;
    }

    public Order getOrder() {
        return order;
    }

    public FormulaOrder order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FormulaOrder)) {
            return false;
        }
        return id != null && id.equals(((FormulaOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FormulaOrder{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
